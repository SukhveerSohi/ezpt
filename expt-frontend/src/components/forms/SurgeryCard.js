import React from 'react'
import Card from '@material-ui/core/Card';
import { CardContent,CardActions, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    pos: {
      marginBottom: 12,
    },
    buttons:{
        justifyContent: 'end'
    }
  });

export default function SurgeryCard({surgery, editSurgery, removeSurgery}) {
    const classes=useStyles();
    const handleEdit=()=>{
        editSurgery(surgery.id)
    }
    const handleRemove=()=>{
        removeSurgery(surgery.id)
    }
    return (
        <Card variant="outlined" className={classes.root}>
        
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    {surgery.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.pos}>
                    {surgery.bodyPart}
                </Typography>
                <Typography variant="body2">
                    {surgery.description}
                </Typography>
                <Typography variant="overline">
                    {surgery.date}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleEdit}>Edit</Button>
                <Button size="small" onClick={handleRemove}>Remove</Button>
            </CardActions>
        </Card>
    )
}
