import { makeStyles } from '@material-ui/core/styles'

export const flex = makeStyles<any, { [prop: string]: string }>({
    flex: props => ({
        display: props.disp ?? 'flex',
        flexFlow: props.flow ?? 'row nowrap',
        justifyContent: props.jc ?? 'Center',
        alignItems: props.ai ?? 'Center',
    })
})