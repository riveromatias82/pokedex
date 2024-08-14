export interface Pokemon {
  id: number
  name: string
  sprite: string
  image: string
  types: Type[]
}

export interface Type {
  name: string
}
