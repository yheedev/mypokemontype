declare module 'ContainerTypes'
declare module 'darkMode'
declare module 'defense'
declare module 'Fire'
declare module 'more'
declare module 'offense'
declare module 'offenseCalSlice.test.tsx'
declare module 'Result'
declare module 'RootRoute'
declare module 'Sun'
declare module 'theme'
declare module 'Title'

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: (
    props: React.SVGProps<SVGSVGElement>,
  ) => JSX.Element
  const src: string
  export default src
}
