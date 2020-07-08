import React, { FunctionComponent } from 'react';
import { SHAPE, Button } from 'baseui/button';
import { Grab, TriangleRight } from 'baseui/icon';

interface PlayPauseButtonProps {
    isStreaming: boolean;
    onToggle: () => any;
}

const PlayPauseButton: FunctionComponent<PlayPauseButtonProps> = (props) => {
    return (
        <Button shape={SHAPE.round} onClick={props.onToggle}>
            {
                props.isStreaming
                    ? <Grab overrides={ { Svg: { style: { transform: 'rotate(90deg)' } } } } size={28} />
                    :<TriangleRight size={28} />
            }
        </Button>
    );
}

export default PlayPauseButton;
