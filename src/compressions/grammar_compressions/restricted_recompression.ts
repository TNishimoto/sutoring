

import * as BasicRecompression from "./basic.recompression"


export function compress(text: string): BasicRecompression.RecompressionResult{
    return BasicRecompression.compress(text, true);
}


