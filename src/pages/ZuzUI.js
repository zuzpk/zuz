import React from 'react';
import {
    Grid,
    Sidebar,
    Button
} from "../ui/src";

function ZuzUI(props) {
    return (
        <Grid>
            <Grid
                style={{
                    maxWidth: 200
                }}
                flex={1}>
                <Button />
            </Grid>
            <Grid
                flex={2}
            >
                <Button />
            </Grid>
        </Grid>
    );
}

export default ZuzUI;