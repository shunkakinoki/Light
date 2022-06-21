import { NavigationLinks } from "@lightdotso/const";

// eslint-disable-next-line no-restricted-imports
import { ListLi } from "../ListLi";

export const FooterList = () => {
  return (
    <div className="mt-12 grid gap-8 xl:col-span-1 xl:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
            Resources
          </h3>
          <ul className="mt-4 space-y-4">
            {NavigationLinks.resources.map(item => {
              return (
                <ListLi
                  key={item.name}
                  external={item.external}
                  href={item.href}
                >
                  {item.name}
                </ListLi>
              );
            })}
          </ul>
        </div>
        <div className="mt-12 md:mt-0">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
            Company
          </h3>
          <ul className="mt-4 space-y-4">
            {NavigationLinks.company.map(item => {
              return (
                <ListLi
                  key={item.name}
                  external={item.external}
                  href={item.href}
                >
                  {item.name}
                </ListLi>
              );
            })}
          </ul>
        </div>
        <div className="mt-12 md:mt-0">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-contrast-low">
            Legal
          </h3>
          <ul className="mt-4 space-y-4">
            {NavigationLinks.legal.map(item => {
              return (
                <ListLi
                  key={item.name}
                  external={item.external}
                  href={item.href}
                >
                  {item.name}
                </ListLi>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
