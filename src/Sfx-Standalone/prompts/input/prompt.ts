import prompt from "../prompts";
import resolve from "../../utilities/resolve";

export default function open(options: IInputOptions, promptCallback: (error: any, input: string) => void = null) {
    return prompt(
        {
            pageUrl: resolve("input.html"),
            height: 225,
            data: options
        },
        promptCallback
    );
}
