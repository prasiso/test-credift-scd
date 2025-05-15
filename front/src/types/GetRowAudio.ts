export type IPropsRowAudio = Omit<_IGetRowAudio, 'playAudio'>

export interface _IGetRowAudio {
    country?: string,
    text: string,
    audio?: string
    playAudio: (row: IPropsRowAudio) => void

}