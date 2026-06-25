
import { Button, ButtonProps } from '@mui/material'



function SubmitButton({ children, ...props }:ButtonProps) {
    return (
        <Button
            type="submit"
            {...props}
            sx={{ backgroundImage: "linear-gradient(90deg,red,black)",fontSize: 20, padding: 2 }}>
            {children}
        </Button>
    )
}

export default SubmitButton
