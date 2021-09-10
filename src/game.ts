import { 关卡列表 } from './关卡列表'

//_______________________________________________//
type 减1_Table = {
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
type 加1_Table = {
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
type 减1<T> = Index<减1_Table, T>
type 减2<T> = 减1<减1<T>>
type 加1<T> = Index<加1_Table, T>
type 加2<T> = 加1<加1<T>>

type Index<T, K> = K extends keyof T ? T[K] : never
type 矩阵_一列<T, I> = { [K in keyof T]: Index<T[K], I> }
type 矩阵_旋转<T, N extends string = '0'> =
    T extends any[] ?
    (N extends `${T[0]['length']}` ? [] :
        [矩阵_一列<T, N>, ...矩阵_旋转<T, 加1<N>>]
    ) : never

type Cast<A1, A2> = A1 extends A2 ? A1 : A2
type _Join<T extends any[], D extends string> = T extends [] ? '' : T extends [any] ? `${T[0]}` : T extends [any, ...infer R] ? `${T[0]}${D}${_Join<R, D>}` : string
type Join<T extends any[], D extends string = ''> = _Join<T, D> extends infer X ? Cast<X, string> : never


//_______________________________________________//
type ____ = {
    后1: any
    后2: any
    前1: any
    前2: any
    当前: any
}
type XXX_left<T, K> =
    K extends string ?
    T extends { [k: string]: any } ?
    {
        前1: T[减1<K>]
        前2: T[减2<K>]
        后1: T[加1<K>]
        后2: T[加2<K>]
        当前: T[K]
    } : never : never

type XXX_right<T, K> =
    K extends string ?
    T extends { [k: string]: any } ? {
        前1: T[加1<K>]
        前2: T[加2<K>]
        后1: T[减1<K>]
        后2: T[减2<K>]
        当前: T[K]
    } : never : never

type Left一行<T> = { [K in keyof T]: Step一个<XXX_left<T, K>> }
type Left<T extends any[][]> = { [K in keyof T]: Left一行<T[K]> }
type Right一行<T> = { [K in keyof T]: Step一个<XXX_right<T, K>> }
type Right<T extends any[][]> = { [K in keyof T]: Right一行<T[K]> }
type Up<T extends any[][]> = 矩阵_旋转<Left<矩阵_旋转<T>>>
type Down<T extends any[][]> = 矩阵_旋转<Right<矩阵_旋转<T>>>
type is过关<T extends any[][]> = '💥' extends T[number][number] ? false : true

type 过关了 = {
    过关了: {
        牛逼: {
            卧槽: { start: Start }
        }
    }
}
type _单行渲染<
    T extends any[][],
    StrArray,
    N extends string = '0'
    > =
    StrArray extends string[] ? (
        N extends `${StrArray['length']}` ?
        is过关<T> extends true ? 过关了 : WSAD<T, '单行'>
        :
        Index<StrArray, N> extends string ? { [K in Index<StrArray, N>]: _单行渲染<T, StrArray, 加1<N>> } : never
    ) : never

type ToStringArray<T> = { [K in keyof T]: T[K] extends any[] ? Join<T[K]> : never }

type 单行渲染<T> =
    T extends any[][] ?
    _单行渲染<T, ToStringArray<T>> : never

type _多行渲染<T extends any[][]> = [`\n${Join<{
    [K in keyof T]: T[K] extends any[] ? Join<T[K]> : never
}, '\n'>}\n`]
type 多行渲染<T> =
    T extends any[] ?
    ({ [K in _多行渲染<T>[0]]: is过关<T> extends true ? 过关了 : WSAD<T, '多行'> })
    : never
type 渲染<T, mode> =
    mode extends '单行' ? 单行渲染<T> :
    mode extends '多行' ? 多行渲染<T> :
    never
type Combo<T, mode> = T extends any[][] ? {
    get over(): 渲染<T, mode>
    get w(): Combo<Up<T>, mode>
    get s(): Combo<Down<T>, mode>
    get a(): Combo<Left<T>, mode>
    get d(): Combo<Right<T>, mode>
} : never

type WSAD<T extends any[][], mode> = {
    get c__combo(): Combo<T, mode>
    get w__上(): 渲染<Up<T>, mode>
    get s__下(): 渲染<Down<T>, mode>
    get a__左(): 渲染<Left<T>, mode>
    get d__右(): 渲染<Right<T>, mode>
}
type Step一个<T extends ____> = {
    '👾': step人<T>
    '💥': step箱<T>
    '💼': '💼'
    '💭': step空<T>
    '🖤': step目<T>
    '👽': step主角加目标<T>
    '😀': step箱子加目标<T>
}[T['当前']]
type 人 = '👾' | '👽'
type 箱 = '💥' | '😀'
type 空 = '💭' | '🖤'
type step人<T extends ____> =
    T['前1'] extends 空 ? '💭'
    : T['前1'] extends 箱 ? (
        T['前2'] extends 空 ? '💭' : T['当前']
    ) : T['当前']

type step主角加目标<T extends ____> =
    T['前1'] extends 空 ? '🖤'
    : T['前1'] extends 箱 ? (
        T['前2'] extends 空 ? '🖤' : T['当前']
    ) : T['当前']

type step空<T extends ____> =
    T['后1'] extends 人 ? T['后1'] :
    T['后1'] extends 箱 ? (
        T['后2'] extends 人 ? T['后1'] : T['当前']
    ) : T['当前']

type step目<T extends ____> =
    T['后1'] extends 人 ? '👽' :
    T['后1'] extends 箱 ? (
        T['后2'] extends 人 ? '😀' : T['当前']
    ) : T['当前']

type step箱<T extends ____> =
    T['后1'] extends 人 ?
    (T['前1'] extends 空 ? T['后1'] : T['当前'])
    : T['当前']

type step箱子加目标<T extends ____> =
    T['后1'] extends 人 ?
    (T['前1'] extends 空 ? '🖤' : T['当前'])
    : T['当前']
type Start = {
    选择关卡: {
        [K in keyof 关卡列表]: {
            选择渲染模式: {
                单行渲染: 单行渲染<关卡列表[K]>
                '多行渲染_按[``]调用': 多行渲染<关卡列表[K]>
            }
        }
    }
}
export const start = null! as Start