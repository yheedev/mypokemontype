import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import ContainerTypes from './ContainerTypes';
import { useNavigate } from 'react-router-dom';
import { offenseCal } from '../features/offenseCalSlice';
//import { TypeName } from '../features/types';
import Option from './SelectorOptions';

/**
 * NOTE
 *
 *[ ] 셀렉터 내부의 공격, 방어 코드를 분리하는게 나은건지?
 *[ ] 공격에서 방어 클릭시 두 번을 클릭해야 UI에서 반영이 됨 active가 아니라 click으로 수정
 *[ ] 방어에서 공격 클릭시 전환이 안됨
 *
 *
 */

export const Selector = () => {
  // const [click, setClick] = useState<'offense' | 'defense'>('offense');
  const [info, setInfo] = useState('공격할 포켓몬의 타입을 선택해주세요!');
  const theme = useSelector((state: RootState) => state.darkMode.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (mode: 'offense' | 'defense', type1?: string, type2?: string) => {
    setInfo(
      mode === 'offense'
        ? '공격할 포켓몬의 타입을 선택해주세요!'
        : '방어할 포켓몬의 타입을 선택해주세요!'
    );
    if (mode === 'offense' && (type1 || type2)) {
      dispatch(offenseCal({ type1, type2 }));
    }
    navigate(mode === 'offense' ? '/' : '/defense');
  };

  return (
    <Container>
      <Card>
        <CardContainer>
          <div className="Option">
            {/* <OptionOffense
              className="Offense"
              onClick={() => handleClick('offense')}
              theme={theme}
            >
              <span className="OptionText OffenseText">공격</span>
            </OptionOffense>
            <OptionDefense className="Defense">
              <span className="OptionText DefenseText">방어</span>
            </OptionDefense> */}
            <Option
              className="Offense"
              theme={theme}
              type="offense"
              children={<span className="OptionText OffenseText">공격</span>}
              onClick={() => handleClick('offense')}
            />
            <Option
              className="Defense"
              theme={theme}
              type="defense"
              children={<span className="OptionText DefenseText">방어</span>}
              onClick={() => handleClick('defense')}
            ></Option>
          </div>
          <div className="InfoContainer">
            <div className="info">{info}</div>
          </div>
          <ContainerTypes />
        </CardContainer>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text);
`;

const CardContainer = styled.div``;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 22px;

  .Option {
    justify-content: space-evenly;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.5rem;
    font-weight: 1000;
    font-family: 'NotoSansBlack';
    margin: 1.3rem 1rem;

    @media (min-width: 280px) and (max-width: 767px) {
      margin: 0.7rem 0.7rem;
    }
  }

  .Offense,
  .Defense {
    letter-spacing: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    border-top: none;
    display: flex;
    padding: 0.5rem 0 1.5rem;
    border-top: none;
    text-align: center;
    vertical-align: middle;
    text-indent: 3px;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.5rem 0 0.5rem;
      font-size: 1.1rem;
    }
  }

  .OptionText {
    display: inline-block;
    letter-spacing: 7px;

    @media (min-width: 280px) and (max-width: 767px) {
      padding-bottom: 0.5rem;
    }
  }

  .OffenseText {
    margin-right: 0.8rem;
  }

  .Offense {
    border-left: none;
    border-right: none;
  }

  .Defense {
    border-right: none;
    border-left: 2px solid var(--color-border);
    /* border-bottom: 2px solid var(--color-border); */
  }

  .InfoContainer {
    padding: 0 1.56rem 1.25rem;
    border-bottom: 2px solid var(--color-border);
    margin: 1rem 1rem;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.625rem 0px 1.25rem;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: span 1;
    font-family: 'NotoSansBlack';
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: 1.5px;
    padding: 1.5rem 0;
    text-align: center;

    @media (min-width: 280px) and (max-width: 767px) {
      font-size: 0.9rem;
      letter-spacing: 1.5px;
      padding: 0.5rem 2rem 0.5rem;
      font-weight: 400;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }
  }
`;

/**
 * TODO
 * [ ] 모바일에서 info 텍스트 두 문장으로 줄바꿈 하기
 * [ ] 공격에서 방어 클릭 시 두 번을 클릭해야 UI에서 반영이 됨 border-bottom 부분 수정하기
 * [ ] 아래에 있는 기존의 Option 스타일 SelectorOptions 컴포넌트에 반영
 * [ ] 옵션 컴포넌트 따로 만들고, 옵션을 선택+선택한 타입+그에 따른 결과를 리덕스에 나중에 한꺼번에 저장 및 관리
 */

// const OptionOffense = styled.div<{ $isActive: boolean; theme: string }>`
//   border-bottom: ${props =>
//     props.$isActive ? '7px solid var(--offenseRec)' : '2px solid var(--color-border)'};
//   cursor: pointer;

//   .OffenseText {
//     color: ${props => (props.$isActive ? 'var(--offenseRec)' : 'var(--normal)')};
//     ${props =>
//       props.theme === 'dark' &&
//       css`
//         color: ${props.$isActive ? 'var(--offenseRec)' : 'var(--charcoal)'};
//       `}
//   }

//   @media (min-width: 280px) and (max-width: 767px) {
//     border-bottom: ${props =>
//       props.$isActive ? '4px solid var(--offenseRec)' : '2px solid var(--color-border)'};
//     .OffenseText {
//       margin-right: 0.1rem;
//     }
//   }
// `;

// const OptionDefense = styled.div<{ $isActive: boolean; theme: string }>`
//   border-bottom: ${props =>
//     props.$isActive ? '7px solid var(--defenseRec)' : '2px solid var(--color-border)'};
//   cursor: pointer;

//   .DefenseText {
//     color: ${props => (props.$isActive ? 'var(--defenseRec)' : 'var(--normal)')};
//     ${props =>
//       props.theme === 'dark' &&
//       css`
//         color: ${props.$isActive ? 'var(--defenseRec)' : 'var(--charcoal)'};
//       `}
//   }

//   @media (min-width: 280px) and (max-width: 767px) {
//     border-bottom: ${props =>
//       props.$isActive ? '5px solid var(--defenseRec)' : '2px solid var(--color-border)'};
//     .DefenseText {
//     }
//   }
// `;

export default Selector;
