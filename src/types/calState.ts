export type TypeCalState = {
  result: { [key: string]: string[] }
  type1?: string
  type2?: string
  calculate: (params: { type1?: string; type2?: string }) => void
}
