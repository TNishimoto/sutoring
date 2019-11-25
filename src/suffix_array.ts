

namespace StrFunctions {
    export namespace SuffixArray {
        /*
        export function compare(str1: string, str2: string): [number, number] {
            const min = Math.min(str1.length, str2.length);
            for (let i = 0; i <= min; i++) {
                if (str1.charAt(i) < str2.charAt(i)) {
                    return [i, - 1];
                } else if (str1.charAt(i) > str2.charAt(i)) {
                    return [i, 1];
                }
            }
            if (str1 == str2) {
                return [str1.length, 0];
            } else {
                return str1.length < str2.length ? [str1.length, 1] : [str2.length, -1];
            }
    
        }
        */


        export function construct(str: string, zero_based : boolean = true): number[] {
            const arr: number[] = new Array(str.length);
            for (let i = 0; i < str.length; i++) {
                arr[i] = i;
            }

            const func = function (item1: number, item2: number): number {
                for (let i = 0; i <= str.length; i++) {
                    if (item1 + i >= str.length || item2 + i >= str.length) break;
                    if (str.charAt(item1 + i) < str.charAt(item2 + i)) {
                        return - 1;
                    } else if (str.charAt(item1 + i) > str.charAt(item2 + i)) {
                        return 1;
                    }
                }
                if (item1 == item2) {
                    return 0;
                } else {
                    return item1 < item2 ? 1 : -1;
                }
            };
            arr.sort(func);

            if(zero_based){
                return arr;
            }else{
                return arr.map((v) => v+1);
            }
        }
        export type SATableOption = { zero_based? : boolean, withSA? : boolean, withLCP? : boolean, withBWT? : boolean} ;
        export function constructSATable(text: string, option : SATableOption = {zero_based : true, withSA : true,  withLCP : false, withBWT : false} ): GraphTableSVG.LogicTable {
            if(option.zero_based == undefined) option.zero_based = true;
            if(option.withSA == undefined) option.withSA = true;
            if(option.withLCP == undefined) option.withLCP = false;
            if(option.withBWT == undefined) option.withBWT = false;            
            const sa = construct(text);
            const view_sa = option.zero_based ? sa : sa.map((v) => v+1);
            const indexes = option.zero_based ? sa.map((v, i) => i) : sa.map((v, i) => i+1);
            const lcpArray = LongestCommonPrefixArray.construct(text);
            const bwt = BWT.construct(text).map((v) => v);

            const arrays : LogicGraphTable.LogicTableLine[] = new Array(0);
            arrays.push({ name: "Index", values: indexes });
            if(option.withSA){
                arrays.push({ name: "SA", values: view_sa  });
            }
            if(option.withLCP){
                arrays.push({ name: "LCP", values: lcpArray  });
            }
            if(option.withBWT){
                arrays.push({ name: "BWT", values: bwt  });
            }

            arrays.push({ name: "Suffix", values: sa.map((v) => text.substr(v)) });


            return StrFunctions.LogicGraphTable.createLogicTable(arrays, { isRowLines: false })

        }
    }
    export namespace LongestCommonPrefixArray {
        function lcp(text1: string, text2: string): number {
            const max = text1.length < text2.length ? text2.length : text1.length;
            for (let i = 0; i < max; i++) {
                if (text1[i] != text2[i]) return i;
            }
            return max;
        }
        export function construct(text: string): number[] {
            const sa = SuffixArray.construct(text);
            const lcpArray = sa.map((_, i) => {
                if (i == 0) {
                    return 0;
                } else {
                    return lcp(text.substr(sa[i]), text.substr(sa[i - 1]))
                }
            })
            return lcpArray;
        }
        export function constructLCPTable(text : string, option : SuffixArray.SATableOption = {zero_based : true, withSA : true,  withLCP : true, withBWT : false} ){
            return SuffixArray.constructSATable(text, option);
        }
    }
    export namespace BWT {
        function getCircularString(text : string, nth : number){
            return text.substr(nth) + text.substr(0, nth);
        }
        function compare(text : string, ith : number, jth :number) : number {
            const ithStr = getCircularString(text, ith);
            const jthStr = getCircularString(text, jth);
            if(ithStr == jthStr){
                return ith - jth;
            }else{
                if(ithStr < jthStr){
                    return -1;
                }else{
                    return 1;
                }
            }
        }
        export function construct(text : string){
            const r = Array.from(Array(text.length).keys());
            r.sort((a,b) =>{
                return compare(text, a, b);
            })
            return r.map((v) =>{
                if(v ==0 ){
                    return text[text.length-1]
                }else{
                    return text[v-1]
                }
            })
        }
        export function constructBWTTable(text : string, option : SuffixArray.SATableOption = {zero_based : true, withSA : true,  withLCP : false, withBWT : true} ){
            return SuffixArray.constructSATable(text, option);
        }
    }
}