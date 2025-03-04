export interface CharacterInterface {
    id: number,
    name: string
    race: string
    gender: string
    image: string
    favorite: boolean
}


interface originPlanetInterface {
    id: number,
    name: string,
    isDestroyed: boolean,
    description: string,
    image: string,
}

interface transformationsInterface {
    id: number,
    name: string,
    image: string,
    ki: string,
}

export interface CharacterDetailsInterface {
    id: number
    name: string,
    ki: string,
    maxKi: string,
    race: string,
    gender: string,
    description: string,
    image: string,
    affiliation: string,
    deletedAt: null,
    originPlanet: originPlanetInterface,
    transformations: transformationsInterface[],
    favorite: boolean
}
