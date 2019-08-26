import StartAudioContext from 'startaudiocontext';
import bowser from 'bowser';

let AUDIO_CONTEXT;
if (!bowser.msie) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext || window.oAudioContext;
    // AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();
    AUDIO_CONTEXT = new window.AudioContext();
    StartAudioContext(AUDIO_CONTEXT); //cs TODO绑定第二个参数触发当前事件
}

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
