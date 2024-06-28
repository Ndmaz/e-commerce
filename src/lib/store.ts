import {create} from 'zustand'

type inputbooleantype={
    inputboolean: boolean
    , flipvalue:()=> void
}

export const useinputboolean=create<inputbooleantype>((set)=>({
inputboolean:false,
flipvalue:()=>{ set((state)=>({inputboolean: !state.inputboolean})) }
}))
