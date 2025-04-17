import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import Input from 'components/input/input';
import Button from 'components/button/button';

export default (props: any) => {
    const classes = useStyles();
    const [submitted, setSubmitted] = React.useState(false);
    const [scuffOptions, setScuffOptions] = React.useState({
        type: 'scuff',
        description: '',
        title: '',
        urls: ''
    });

    return (
        <>
            {submitted ? (
                <div className={classes.container}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Your report was submitted
                    </Typography>
                </div>
            ) : (
                <div className={classes.container}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Bug Report
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Be descriptive, succinct, and provide enough information that someone can reproduce and verify your issue.
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        The report will be sent to our developers, and they will review it as soon as possible.
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        We reserve the right to dismiss your bug report if its total dogshit.
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        **Updated** Select a report type before submitting, please pick the category that is the best fit.
                    </Typography>
                    <hr />
                    <div style={{ textAlign: 'left', marginTop: 16 }}>
                        <Input.Select
                            label="Type"
                            value={scuffOptions.type}
                            onChange={(value: any) => {
                                setScuffOptions({
                                    ...scuffOptions,
                                    type: value
                                });
                            }}
                            items={[
                                {
                                    id: 'scuff',
                                    name: 'General Scuff',
                                },
                                {
                                    id: 'lost',
                                    name: 'Lost Item or Reward',
                                },
                                {
                                    id: '3d',
                                    name: '3D Models or Clothing',
                                },
                                {
                                    id: 'exploit',
                                    name: 'Exploit',
                                }
                            ]}
                        />
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Input.Text
                            label="Title"
                            value={scuffOptions.title}
                            onChange={(value: any) => {
                                setScuffOptions({
                                    ...scuffOptions,
                                    title: value
                                });
                            }}
                            icon="info-circle"
                        />
                    </div>
                    <div style={{ textAlign: 'left', marginTop: 16 }}>
                        <Input.TextArea
                            label="Description"
                            value={scuffOptions.description}
                            onChange={(value: any) => {
                                setScuffOptions({
                                    ...scuffOptions,
                                    description: value
                                });
                            }}
                            icon="barcode"
                        />
                    </div>
                    <div style={{ textAlign: 'left', marginTop: 16 }}>
                        <Input.TextArea
                            label="VOD / Clip / Screenshot URLs (separated by new line) - include scrolling of F8 window if possible"
                            value={scuffOptions.urls}
                            onChange={(value: any) => {
                                setScuffOptions({
                                    ...scuffOptions,
                                    urls: value
                                });
                            }}
                            icon="barcode"
                        />
                    </div>
                    <div style={{ marginTop: 32 }}>
                        <Button.Primary onClick={() => {
                            if (scuffOptions.title && scuffOptions.description) {
                                props.submitBug(scuffOptions)
                                setSubmitted(true);
                            }
                        }}>
                            Submit
                        </Button.Primary>
                    </div>
                </div>
            )}
        </>
    )
}