import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { getCurrentChannelId, getCurrentChannels } from '../../selectors/selectors';
import { setCurrentChannelId } from '../../slices/channelSlice';
import { openModalWindow } from '../../slices/modalSlice';

const Channel = ({
  channelName,
  isRemovable,
  isCurrent,
  id,
}) => {
  const { t } = useTranslation();
  const isChoosenBtn = isCurrent ? 'secondary' : null;
  const dispatch = useDispatch();

  const chooseActiveChannel = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };

  const removeChannel = (channelId) => () => {
    dispatch(
      openModalWindow({ modalType: 'removeChannel', managedChannelId: channelId }),
    );
  };

  const renameChannel = (channelId) => () => {
    dispatch(
      openModalWindow({ modalType: 'renameChannel', managedChannelId: channelId }),
    );
  };

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex" onClick={chooseActiveChannel(id)}>
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate btn"
          variant={isChoosenBtn}
        >
          <span className="me-1">#</span>
          {channelName}
        </Button>
        {isRemovable ? (
          <div>
            <Dropdown.Toggle
              split
              className="flex-grow-0"
              variant={isChoosenBtn}
            >
              <span className="visually-hidden">
                {t('channelsInf.handleChannel')}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={removeChannel(id)}>
                {t('chatPage.delete')}
              </Dropdown.Item>
              <Dropdown.Item onClick={renameChannel(id)}>
                {t('chatPage.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        ) : null}
      </Dropdown>
    </li>
  );
};

const ChannelsBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getCurrentChannels);
  const currentChannelId = useSelector(getCurrentChannelId);

  const addNewChannel = () => {
    dispatch(openModalWindow({ modalType: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={addNewChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            channelName={channel.name}
            key={channel.id}
            id={channel.id}
            isRemovable={channel.removable}
            isCurrent={channel.id === currentChannelId}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
