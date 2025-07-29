'use client'

import { useDarkModeStore } from '@/stores/useDarkModeStore'
import Sun from '@/assets/Sun.svg'
import ToggleOff from '@/assets/ToggleOff.svg'
import Moon from '@/assets/Moon.svg'
import ToggleOn from '@/assets/ToggleOn.svg'
import { themeToggle, themeToggleIcon } from '@/lib/classUtil'
import { cn } from '@/lib/utils'

export default function DarkModeBtn() {
  const theme = useDarkModeStore((state) => state.theme)
  const toggleTheme = useDarkModeStore((state) => state.toggleTheme)

  return (
    <button
      aria-label="클릭하면 다크 모드 혹은 라이트 모드로 변경됩니다."
      onClick={toggleTheme}
      className="btnShadow border-none bg-none"
    >
      <div className="themeToggle">
        {theme === 'dark' ? (
          <>
            <ToggleOff className={cn(themeToggle)} />
            <Sun className={cn(themeToggleIcon, 'btnIconShadow left-[68%]')} />
          </>
        ) : (
          <>
            <ToggleOn className={cn(themeToggle)} />
            <Moon className={cn(themeToggleIcon, 'btnIconShadow left-[38%]')} />
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

// export const toggleStyles = css` // classUtil 분리 (themeToggle)
//   fill: var(--color-toggle);
//   position: relative;
//   width: 5.5rem;
//   height: 2.5rem; h-10
// `

// export const iconStyles = css` // classUtil 분리 (themeToggleIcon)
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
