/**
 * ankerlink一覧を出すコンポーネント
 */
export default function AnkerLink(props) {
  return <a href={props.href}>{props.text}</a>;
}
