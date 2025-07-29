'use client'

import { useDarkModeStore } from '@/stores/useDarkModeStore'
import { ReactComponent as Sun } from '@/assets/Sun.svg'
import { ReactComponent as ToggleOff } from '@/assets/ToggleOff.svg'
import { ReactComponent as Moon } from '@/assets/Moon.svg'
import { ReactComponent as ToggleOn } from '@/assets/ToggleOn.svg'
import clsx from 'clsx'

export default function DarkModeToggle() {
  const theme = useDarkModeStore((state) => state.theme)
  const toggleTheme = useDarkModeStore((state) => state.toggleTheme)

  return (
    <button
      aria-label="클릭하면 다크 모드 혹은 라이트 모드로 변경됩니다."
      onClick={toggleTheme}
      className="border-none bg-transparent p-0"
    >
      <div className="fill-toggle text-toggleIcon relative h-[2.5rem] w-[5.5rem]">
        {theme === 'dark' ? (
          <>
            <ToggleOff className="shadow-bl h-full w-full" />
            <Sun
              className={clsx(
                'shadow-bl absolute top-[40%] left-[79%] h-6 w-6 -translate-x-1/2 -translate-y-1/2',
              )}
            />
          </>
        ) : (
          <>
            <ToggleOn className="shadow-bl h-full w-full" />
            <Moon
              className={clsx(
                'shadow-gr absolute top-[40%] left-[68%] h-6 w-6 -translate-x-1/2 -translate-y-1/2',
              )}
            />
          </>
        )}
      </div>
    </button>
  )
}

// import styled, { css } from 'styled-components'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from 'stores/store'
// import { darkModeSlice, useToggleTheme } from 'features/darkModeSlice'
// import { ReactComponent as Sun } from 'img/Sun.svg'
// import { ReactComponent as ToggleOff } from 'img/ToggleOff.svg'
// import { ReactComponent as Moon } from 'img/Moon.svg'
// import { ReactComponent as ToggleOn } from 'img/ToggleOn.svg'

// export const DarkModeBtn = () => {
//   const dispatch = useDispatch()
//   const toggle = useToggleTheme()[0]
//   const theme = useSelector((state: RootState) => state.darkMode.theme)

//   const handleClick = () => {
//     toggle()
//     const newTheme = theme === 'dark' ? 'light' : 'dark'
//     dispatch(darkModeSlice.actions.setTheme(newTheme))
//   }

//   return (
//     <Btn aria-label="클릭하면 다크 모드 혹은 라이트 모드로 변경됩니다.">
//       <BtnContainer onClick={handleClick}>
//         {theme === 'dark' ? (
//           <>
//             <ToggleOffIcon className="Toggle ToggleOff shadow-bl"></ToggleOffIcon>
//             <SunIcon className="ToggleIcon shadow-bl" />
//           </>
//         ) : (
//           <>
//             <ToggleOnIcon className="shadow-bl Toggle ToggleOff"></ToggleOnIcon>
//             <MoonIcon className="ToggleIcon shadow-gr" />
//           </>
//         )}
//       </BtnContainer>{' '}
//     </Btn>
//   )
// }

// const Btn = styled.button`
//   background: none;
//   border: none;
// `

// const BtnContainer = styled.div`
//   background: none;
//   border: none;
// `

// export const toggleStyles = css`
//   fill: var(--color-toggle);
//   position: relative;
//   width: 5.5rem;
//   height: 2.5rem;
// `

// export const iconStyles = css`
//   width: 1.5rem;
//   height: 1.5rem;
//   position: absolute;
//   transform: translate(-50%, -50%);
//   fill: var(--color-toggleIcon);
//   top: 40%;
// `

// const ToggleOffIcon = styled(ToggleOff)`
//   ${toggleStyles}
// `

// const ToggleOnIcon = styled(ToggleOn)`
//   ${toggleStyles}
// `

// const SunIcon = styled(Sun)`
//   ${iconStyles}
//   left: 79%;
// `

// const MoonIcon = styled(Moon)`
//   ${iconStyles}
//   left: 68%;
// `

// export default DarkModeBtn

// // TODO
// // [ ] scss 코드로 압축할 수 있는 css 코드 있는지 확인 -> 리팩토링 나중에
