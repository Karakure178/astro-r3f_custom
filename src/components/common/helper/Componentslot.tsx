// vueでいうslotのようなものをreactで実現するためのクラス
// 実装参考
// https://blog.capilano-fw.com/?p=11118

import { Children } from "react";

export class ComponentSlot {
  constructor(children) {
    this.children = Children.toArray(children);
  }

  get(key, defaultValue = "") {
    const contents = this.children.find((child) => {
      return (
        child.type === "template" && child.props.slot === key // スロット名が一致する要素を返す
      );
    });

    return contents ? contents.props.children : defaultValue; // コンテンツがない場合はデフォルト値を返す
  }
}
