// SPDX-License-Identifier: MIT
// Code from: https://github.com/w1nt3r-eth/hot-chain-svg/blob/main/contracts/SVG.sol
// Slightly modified for specific preferances & purposes.

pragma solidity ^0.8.16;
import "./Utils.sol";

library SVG {
  function g(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("g", _props, _children);
  }

  function path(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("path", _props, _children);
  }

  function text(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("text", _props, _children);
  }

  function line(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("line", _props, _children);
  }

  function circle(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("circle", _props, _children);
  }

  function circle(string memory _props) internal pure returns (string memory) {
    return el("circle", _props);
  }

  function rect(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("rect", _props, _children);
  }

  function rect(string memory _props) internal pure returns (string memory) {
    return el("rect", _props);
  }

  function filter(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("filter", _props, _children);
  }

  function cdata(string memory _content) internal pure returns (string memory) {
    return string.concat("<![CDATA[", _content, "]]>");
  }

  function radialGradient(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("radialGradient", _props, _children);
  }

  function linearGradient(string memory _props, string memory _children)
    internal
    pure
    returns (string memory)
  {
    return el("linearGradient", _props, _children);
  }

  function gradientStop(
    uint256 offset,
    string memory stopColor,
    string memory _props
  ) internal pure returns (string memory) {
    return
      el(
        "stop",
        string.concat(
          prop("stop-color", stopColor),
          " ",
          prop("offset", string.concat(Utils.uint2str(offset), "%")),
          " ",
          _props
        )
      );
  }

  function animateTransform(string memory _props)
    internal
    pure
    returns (string memory)
  {
    return el("animateTransform", _props);
  }

  function image(string memory _href, string memory _props)
    internal
    pure
    returns (string memory)
  {
    return
      el("image", string.concat(prop("href", _href), " ", _props), Utils.NULL);
  }

  function el(
    string memory _tag,
    string memory _props,
    string memory _children
  ) internal pure returns (string memory) {
    return
      string.concat("<", _tag, " ", _props, ">", _children, "</", _tag, ">");
  }

  function el(string memory _tag, string memory _props)
    internal
    pure
    returns (string memory)
  {
    return string.concat("<", _tag, " ", _props, "/>");
  }

  function prop(string memory _key, string memory _val)
    internal
    pure
    returns (string memory)
  {
    return string.concat(_key, "=", '"', _val, '" ');
  }
}
