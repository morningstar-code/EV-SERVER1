import React from 'react';
import Text from 'components/text/text';
import { Slider } from '@mui/material';

export default (props: any) => {
    const notEnabled = props.sfxPacks.filter((pack: any) => {
        return props.enabledSfxPacks[pack.id]
    }).length <= 1;

    return (
        <div>
            <div>
                <Text variant="h4">
                    {props.binderName || 'Trading Card'} Binder Settings
                </Text>
                <Text variant="h5">
                    Name
                </Text>
                {/* TODO; Input */}
            </div>
            <div>
                <Text variant="h4">
                    Global Settings
                </Text>
                <Text variant="h5">
                    Volume
                </Text>
                <Slider
                    onChange={(e, value) => {
                        return props.updateSettings({ volume: Number(value) })
                    }}
                    min={0}
                    max={1}
                    step={0.05}
                    value={props.volume}
                />
                <Text variant="body1">
                    {Math.round(props.volume * 100)}%
                </Text>
                <br />
                <br />
                {/* TODO; MUI Checkbox */}
                <Text variant="body2">
                    Also view card when shown to others.
                </Text>
                <br />
                <br />
                {/* TODO; MUI Checkbox */}
                <Text variant="body2">
                    This setting can help with binder performance if it feels a little slow and you have a lot of holos.
                </Text>
                <br />
                <br />
                <br />
                <Text variant="h5">
                    Pack Opening Voices
                </Text>
                {/* TODO; MUI Checkbox */}
                <hr />
                <Text variant="body2">
                    A random sound pack will be picked from the selected packs below when opening a booster.
                </Text>
                {/* TODO; Figure Out */}
            </div>
        </div>
    )
}