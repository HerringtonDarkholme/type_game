import { stages } from './stages'

//_______________________________________________//
type Sub1Table = {
    '0': '-1'
    '1': '0'
    '2': '1'
    '3': '2'
    '4': '3'
    '5': '4'
    '6': '5'
    '7': '6'
    '8': '7'
    '9': '8'
    '10': '9'
    '11': '10'
    '12': '11'
    '13': '12'
    '14': '13'
    '15': '14'
    '16': '15'
    '17': '16'
    '18': '17'
    '19': '18'
    '20': '19'
}
type Add1Table = {
    '0': '1'
    '1': '2'
    '2': '3'
    '3': '4'
    '4': '5'
    '5': '6'
    '6': '7'
    '7': '8'
    '8': '9'
    '9': '10'
    '10': '11'
    '11': '12'
    '12': '13'
    '13': '14'
    '14': '15'
    '15': '16'
    '16': '17'
    '17': '18'
    '18': '19'
    '19': '20'
    '20': '21'
}
type Sub1<T> = Index<Sub1Table, T>
type Sub2<T> = Sub1<Sub1<T>>
type Add1<T> = Index<Add1Table, T>
type Add2<T> = Add1<Add1<T>>

type Index<T, K> = K extends keyof T ? T[K] : never
type MatrixRow<T, I> = { [K in keyof T]: Index<T[K], I> }
type MatrixRotate<T, N extends string = '0'> =
    T extends any[] ?
    (N extends `${T[0]['length']}` ? [] :
        [MatrixRow<T, N>, ...MatrixRotate<T, Add1<N>>]
    ) : never

type Cast<A1, A2> = A1 extends A2 ? A1 : A2
type _Join<T extends any[], D extends string> = T extends [] ? '' : T extends [any] ? `${T[0]}` : T extends [any, ...infer R] ? `${T[0]}${D}${_Join<R, D>}` : string
type Join<T extends any[], D extends string = ''> = _Join<T, D> extends infer X ? Cast<X, string> : never


//_______________________________________________//
type ____ = {
    prev1: any
    prev2: any
    next1: any
    next2: any
    current: any
}
type XXX_left<T, K> =
    K extends string ?
    T extends { [k: string]: any } ?
    {
        next1: T[Sub1<K>]
        next2: T[Sub2<K>]
        prev1: T[Add1<K>]
        prev2: T[Add2<K>]
        current: T[K]
    } : never : never

type XXX_right<T, K> =
    K extends string ?
    T extends { [k: string]: any } ? {
        next1: T[Add1<K>]
        next2: T[Add2<K>]
        prev1: T[Sub1<K>]
        prev2: T[Sub2<K>]
        current: T[K]
    } : never : never

type LeftOneLine<T> = { [K in keyof T]: StepOne<XXX_left<T, K>> }
type Left<T extends any[][]> = { [K in keyof T]: LeftOneLine<T[K]> }
type RightOneLine<T> = { [K in keyof T]: StepOne<XXX_right<T, K>> }
type Right<T extends any[][]> = { [K in keyof T]: RightOneLine<T[K]> }
type Up<T extends any[][]> = MatrixRotate<Left<MatrixRotate<T>>>
type Down<T extends any[][]> = MatrixRotate<Right<MatrixRotate<T>>>
type isClear<T extends any[][]> = '💥' extends T[number][number] ? false : true

type GameClear = {
    GameClear: {
        WOW: {
            MuchFun: { start: Start }
        }
    }
}
type _SingleLineRender<
    T extends any[][],
    StrArray,
    N extends string = '0'
    > =
    StrArray extends string[] ? (
        N extends `${StrArray['length']}` ?
        isClear<T> extends true ? GameClear : WSAD<T, 'singleLine'>
        :
        Index<StrArray, N> extends string ? { [K in Index<StrArray, N>]: _SingleLineRender<T, StrArray, Add1<N>> } : never
    ) : never

type ToStringArray<T> = { [K in keyof T]: T[K] extends any[] ? Join<T[K]> : never }

type SingleLineRender<T> =
    T extends any[][] ?
    _SingleLineRender<T, ToStringArray<T>> : never

type _MultiLineRender<T extends any[][]> = [`\n${Join<{
    [K in keyof T]: T[K] extends any[] ? Join<T[K]> : never
}, '\n'>}\n`]
type MultiLineRender<T> =
    T extends any[] ?
    ({ [K in _MultiLineRender<T>[0]]: isClear<T> extends true ? GameClear : WSAD<T, 'multiLine'> })
    : never
type Render<T, mode> =
    mode extends 'single' ? SingleLineRender<T> :
    mode extends 'multiLine' ? MultiLineRender<T> :
    never
type Combo<T, mode> = T extends any[][] ? {
    get over(): Render<T, mode>
    get w(): Combo<Up<T>, mode>
    get s(): Combo<Down<T>, mode>
    get a(): Combo<Left<T>, mode>
    get d(): Combo<Right<T>, mode>
} : never

type WSAD<T extends any[][], mode> = {
    get c__combo(): Combo<T, mode>
    get w__up(): Render<Up<T>, mode>
    get s__down(): Render<Down<T>, mode>
    get a__left(): Render<Left<T>, mode>
    get d__right(): Render<Right<T>, mode>
}
type StepOne<T extends ____> = {
    '👾': stepPlayer<T>
    '💥': stepChest<T>
    '💼': '💼'
    '💭': stepEmpty<T>
    '🖤': stepGoal<T>
    '👽': stepPlayerOrGoal<T>
    '😀': stepChestOrGoal<T>
}[T['current']]
type Player = '👾' | '👽'
type Chest = '💥' | '😀'
type Empty = '💭' | '🖤'
type stepPlayer<T extends ____> =
    T['next1'] extends Empty ? '💭'
    : T['next1'] extends Chest ? (
        T['next2'] extends Empty ? '💭' : T['current']
    ) : T['current']

type stepPlayerOrGoal<T extends ____> =
    T['next1'] extends Empty ? '🖤'
    : T['next1'] extends Chest ? (
        T['next2'] extends Empty ? '🖤' : T['current']
    ) : T['current']

type stepEmpty<T extends ____> =
    T['prev1'] extends Player ? T['prev1'] :
    T['prev1'] extends Chest ? (
        T['prev2'] extends Player ? T['prev1'] : T['current']
    ) : T['current']

type stepGoal<T extends ____> =
    T['prev1'] extends Player ? '👽' :
    T['prev1'] extends Chest ? (
        T['prev2'] extends Player ? '😀' : T['current']
    ) : T['current']

type stepChest<T extends ____> =
    T['prev1'] extends Player ?
    (T['next1'] extends Empty ? T['prev1'] : T['current'])
    : T['current']

type stepChestOrGoal<T extends ____> =
    T['prev1'] extends Player ?
    (T['next1'] extends Empty ? '🖤' : T['current'])
    : T['current']
type Start = {
    chooseStage: {
        [K in keyof stages]: {
            chooseRenderMode: {
                singleLine: SingleLineRender<stages[K]>
                'multiLine: Press [``] to render': MultiLineRender<stages[K]>
            }
        }
    }
}
export const start = null! as Start
