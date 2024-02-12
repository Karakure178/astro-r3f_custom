import css from 'styled-jsx/css'

export const StyledJsx = () => {
  return (
    <>
      <div className="container">
        <p className="title">- Styled Jsx -</p>
        <button className="button">Click Me!</button>
      </div>
      <style jsx="true">{style}</style>
    </>
  );
};

const style = css`
.container {
    margin: 0 auto;
        text-align: center;
}
`