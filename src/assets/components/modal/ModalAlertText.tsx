import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ModalAlertText({ openModalText, setOpenModalText }: any) {
  return (
    <div>
      <Modal
        open={openModalText}
        onClose={() => setOpenModalText(false)}
        aria-labelledby="modal-alert-text"
        aria-describedby="modal-alert-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-alert-text"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Register is success :)
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAlertText;
