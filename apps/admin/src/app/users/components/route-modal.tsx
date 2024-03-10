import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import * as React from "react"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit",
  bgcolor: "background.paper",
  border: "1px solid #cccccc",
  borderRadius: "0.375rem",
  boxShadow: 24,
  p: 4
}

export default function RouteModal({ route, isOpen, onClose }) {
  const [open, setOpen] = React.useState(isOpen)
  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Customer visit sequence:
        </Typography>
        {route?.map((customer, index) => (
          <Typography
            key={`customer-${index}`}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {customer.name}, Coords: ({customer.coordX}, {customer.coordY}) -
            Phone: {customer.phone}
          </Typography>
        ))}
      </Box>
    </Modal>
  )
}
