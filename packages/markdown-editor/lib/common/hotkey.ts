import * as monaco from 'monaco-editor';

// 定义修饰键映射
const modifierMap: { [key: string]: number } = {
    'Ctrl': monaco.KeyMod.CtrlCmd,
    'Shift': monaco.KeyMod.Shift,
    'Alt': monaco.KeyMod.Alt
};

// 定义主按键映射
const keyCodeMap: { [key: string]: number } = {
    'A': monaco.KeyCode.KeyA,
    'B': monaco.KeyCode.KeyB,
    'C': monaco.KeyCode.KeyC,
    'D': monaco.KeyCode.KeyD,
    'E': monaco.KeyCode.KeyE,
    'F': monaco.KeyCode.KeyF,
    'G': monaco.KeyCode.KeyG,
    'H': monaco.KeyCode.KeyH,
    'I': monaco.KeyCode.KeyI,
    'J': monaco.KeyCode.KeyJ,
    'K': monaco.KeyCode.KeyK,
    'L': monaco.KeyCode.KeyL,
    'M': monaco.KeyCode.KeyM,
    'N': monaco.KeyCode.KeyN,
    'O': monaco.KeyCode.KeyO,
    'P': monaco.KeyCode.KeyP,
    'Q': monaco.KeyCode.KeyQ,
    'R': monaco.KeyCode.KeyR,
    'S': monaco.KeyCode.KeyS,
    'T': monaco.KeyCode.KeyT,
    'U': monaco.KeyCode.KeyU,
    'V': monaco.KeyCode.KeyV,
    'W': monaco.KeyCode.KeyW,
    'X': monaco.KeyCode.KeyX,
    'Y': monaco.KeyCode.KeyY,
    'Z': monaco.KeyCode.KeyZ,
};

export function stringToKeybinding(keybindingString: string): number {
    const parts = keybindingString.split(' ');
    let keybinding = 0;

    // 处理修饰键
    for (let i = 0; i < parts.length - 1; i++) {
        const modifier = parts[i];
        if (modifier in modifierMap) {
            keybinding |= modifierMap[modifier];
        }
    }

    // 处理主按键
    const mainKey = parts[parts.length - 1];
    if (mainKey in keyCodeMap) {
        keybinding |= keyCodeMap[mainKey];
    }

    return keybinding;
}
