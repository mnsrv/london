export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        font-size: 60px;
        line-height: 70px;
        width: 80px;
        text-align: center;
        margin-right: 10px;
      }
      @media (max-width: 560px) {
        div { display: none }
      }
   `}</style>
  </div>
)
