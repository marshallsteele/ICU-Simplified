import { Skill } from "@discretize/gw2-ui-new";

interface Props {
    text:string;
}

function TextWithSkills(props: Props) {
    const parseSkills = (text:string) => {
        const regex = /\[(\d+)\]/g; // Match [123], [202], etc.
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            const { index } = match;
            const skillId = parseInt(match[1], 10);

            // Push text before the match
            if (index > lastIndex) {
            parts.push(text.slice(lastIndex, index));
            }

            // Push Skill component
            parts.push(<Skill key={index} id={skillId} />);

            // Update last index
            lastIndex = regex.lastIndex;
        }

        // Push any remaining text after the last match
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };

    const parsedContent = parseSkills(props.text);

    return <p style={{display:'inline'}}>{parsedContent}</p>;
}

export default TextWithSkills;
