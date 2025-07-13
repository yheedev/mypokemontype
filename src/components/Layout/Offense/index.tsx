import Title from '@/components/UI/Title'
import Selector from '@/components/UI/Selector'
// import { Selector } from 'components/Selector'
// import Result from 'components/Result'
// import BtnMenu from 'components/BtnMenu'

function Offense() {
  return (
    <div>
      <Title />
      <div className="m-4 grid grid-cols-1 gap-12 p-4 lg:grid-cols-2">
        <Selector />
      </div>
      {/* <Result /> */}
      {/* </div> */}
      {/* <BtnMenu /> */}
    </div>
  )
}

export default Offense

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 3rem;
//   padding: 1rem;
//   margin: 1rem;

//   @media (max-width: 1023px) {
//     grid-template-columns: 1fr;
//   }
// `;

// 6:18:17
