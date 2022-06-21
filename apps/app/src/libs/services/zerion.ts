import { ApiLinks } from "@lightdotso/const";
import { uniq } from "lodash";

const zerionWsFetcher: any = (queries: string[]) => {
  return new Promise((resolve, reject) => {
    const openQueries = uniq(
      queries.map(query => {
        return `${query.split(",")[0]}`;
      }),
    );
    let doneQueries = 0;
    let data: any = {};

    const webSocket = new WebSocket(
      `${ApiLinks.ZERION}/?api_token=${
        process.env.NEXT_PUBLIC_ZERION_API_KEY as string
      }&EIO=3&transport=websocket`,
    );
    webSocket.addEventListener("message", event => {
      if ((event.data as string).startsWith("40")) {
        const openData = event.data.replace("40/", "").split(",")[0];
        const readyQueries = queries.filter(query => {
          return query.startsWith(openData);
        });
        if (readyQueries.length === 0) return;
        readyQueries.forEach(query => {
          return webSocket.send(`42/${query}`);
        });
      }
      if ((event.data as string).startsWith("42")) {
        doneQueries++;

        data = {
          ...data,
          [JSON.parse(event.data.split(/,(.+)/)[1])[0]]: JSON.parse(
            event.data.split(/,(.+)/)[1],
          )[1].payload,
        };
        if (doneQueries === queries.length) {
          webSocket.close();
          resolve(data);
        }
      }
    });
    webSocket.addEventListener("error", event => {
      console.error("error fetching assets: ", event);
      reject(event);
    });
    webSocket.addEventListener("open", () => {
      openQueries.forEach(openQuery => {
        webSocket.send(`40/${openQuery},`);
      });
    });
  });
};

export const getAssets = async (account: string) => {
  const query = [
    `address,["subscribe",{"scope":["assets"],"payload":{"address":"${account}","currency":"usd"}}]`,
  ];

  const assets = await zerionWsFetcher(query);

  return Object.keys(assets)
    .map(key => {
      return Object.values(assets[key][Object.keys(assets[key])[0]]).map(
        (asset: any) => {
          return {
            ...asset.asset,
            quantity: asset.quantity,
          };
        },
      );
    })
    .reduce((a, b) => {
      return [...a, ...b];
    }, []);
};
