import {
  React,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast, ToastContainer } from 'react-toastify';
import {
  getChannelsNames,
  getCurrentChannel,
  getCurrentChannelId,
  getModalType,
  getOpenedStatus,
} from '../../selectors/selectors.js';
import { closeModalWindow } from '../../slices/modalSlice.js';
import {
  setCurrentChannelId,
  removeChannel,
  renameChannel,
} from '../../slices/channelSlice.js';
import SocketContext from '../../contexts/socketContext';

const validationSchema = (channels) => Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('modalWindow.errors.required')
    .min(3, 'modalWindow.errors.minLength')
    .max(20, 'modalWindow.errors.maxLength')
    .notOneOf(channels, 'modalWindow.errors.uniq'),
});

const AddNewChannelModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const channelsName = useSelector(getChannelsNames);
  const { t } = useTranslation();
  const { addChannel } = useContext(SocketContext);

  const [isActiveBtn, setIsActiveBtn] = useState(true);
  const notAddChannel = () => {
    toast.error(t('networkError'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('channelsInf.addChannel')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema(channelsName)}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            const filtredChannelName = {
              name: filter.clean(values.name),
            };
            try {
              const response = await addChannel(filtredChannelName);
              const { id } = response.data;
              dispatch(setCurrentChannelId(id));
              handleClose();
            } catch {
              setIsActiveBtn(false);
              notAddChannel();
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-2"
                  autoFocus="true"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('channelsInf.channelName')}
                </label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {t(errors.name)}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  onClick={handleClose}
                  disabled={!isActiveBtn ? 'disabled' : null}
                >
                  {t('modalWindow.reset')}
                </Button>
                <Button
                  variant="primary"
                  disabled={!isActiveBtn ? 'disabled' : null}
                  type="submit"
                >
                  {t('modalWindow.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

const RemoveChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);
  const [isActiveBtn, setIsActiveBtn] = useState(true);
  const { deleteChannel } = useContext(SocketContext);

  const notRemoveChannel = () => {
    toast.error(t('networkError'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleRemove = () => {
    const channelToRemove = {
      id: currentChannel.id,
    };
    try {
      deleteChannel(channelToRemove);
      dispatch(removeChannel({ managedChannelId: currentChannelId }));
      handleClose();
    } catch {
      notRemoveChannel();
      setIsActiveBtn(false);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          {`${t('modalWindow.removeChannel')} # '${currentChannel.name}'`}
        </Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalWindow.conformation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={!isActiveBtn ? 'disabled' : null}
          >
            {t('modalWindow.reset')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={!isActiveBtn ? 'disabled' : null}
          >
            {t('modalWindow.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

const RenameChannelModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const channelsName = useSelector(getChannelsNames);
  const currentChannel = useSelector(getCurrentChannel);
  const [isActiveBtn, setIsActiveBtn] = useState(true);
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { changeNameChannel } = useContext(SocketContext);

  const notRenameChannel = () => {
    toast.error(t('networkError'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modalWindow.renameChannel')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: currentChannel.name, id: currentChannel.id }}
          validationSchema={validationSchema(channelsName)}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            const channelToRename = {
              id: values.id,
              name: filter.clean(values.name),
            };
            try {
              changeNameChannel(channelToRename);
              dispatch(renameChannel(values));
              handleClose();
            } catch {
              setIsActiveBtn(false);
              notRenameChannel();
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  id="name"
                  name="name"
                  className="mb-2"
                  ref={inputRef}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('channelsInf.channelName')}
                </label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {t(errors.name)}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  onClick={handleClose}
                  disabled={!isActiveBtn ? 'disabled' : null}
                >
                  {t('modalWindow.reset')}
                </Button>
                <Button
                  variant="primary"
                  disabled={!isActiveBtn ? 'disabled' : null}
                  type="submit"
                >
                  {t('modalWindow.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

const mappingForWindowType = {
  addChannel: AddNewChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(getOpenedStatus);
  const handleCloseWindow = () => {
    dispatch(closeModalWindow());
  };

  const modalType = useSelector(getModalType);
  const ModalComponent = mappingForWindowType[modalType];

  return (
    <>
      <Modal show={isOpened} onHide={handleCloseWindow} centered>
        {ModalComponent && <ModalComponent handleClose={handleCloseWindow} />}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalWindow;
