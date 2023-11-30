import { React } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
//import { getCurrentChannel } from '../../selectors';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../../store/channelSlice';
import { openModalWindow } from '../../store/modalSlice';
// import { animateScroll } from 'react-scroll';

const Channel = ({ channelName, isRemovable, isCurrent, handleRemove, handleChoose, handleRename }) => {
    //console.log(channelName, key, id, isRemovable, isCurrent);
    const { t } = useTranslation();
    const isChoosenBtn = isCurrent ? 'secondary' : null;

    return (
        <li className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex" onClick={handleChoose}>
                <Button
                    type="button"
                    className="w-100 rounded-0 text-start text-truncate btn"
                    variant={isChoosenBtn}
                >
                    <span className="me-1">#</span>
                    {channelName}
                </Button>
                {isRemovable ? (
                    <>
                        <Dropdown.Toggle split className="flex-grow-0" variant={isChoosenBtn}>
                            <span className="visually-hidden">{'Channel menu'}</span>
                        </Dropdown.Toggle>

                        < Dropdown.Menu >
                            <Dropdown.Item onClick={handleRemove}>{t('chatPage.delete')}</Dropdown.Item>
                            <Dropdown.Item onClick={handleRename}>{t('chatPage.rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </>)
                    : (
                        null
                    )
                }
            </Dropdown>
        </li >
    );
};

const ChannelsBox = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { channels, currentChannelId } = useSelector((state) => state.channelsStore);

    const chooseActiveChannel = (id) => () => {
        console.log('Choose! ' + id);
        dispatch(setCurrentChannelId(id));
    };

    const addNewChannel = () => {
        console.log('add New Channel! Press buttom "+"');
        dispatch(openModalWindow({ modalType: 'addChannel' }));
    };

    const removeChannel = () => {
        console.log('delete Channel!');
        dispatch(openModalWindow({ modalType: 'removeChannel', managedChannelId: currentChannelId }));
    };

    const renameChannel = () => {
        console.log('rename Channel!');
        dispatch(openModalWindow({ modalType: 'renameChannel', managedChannelId: currentChannelId }));
    };

    /*
    useEffect(()=> {
        console.log("rerender channels box");
    }, [dispatch]);
    */

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
                        handleChoose={chooseActiveChannel(channel.id)}
                        handleRemove={removeChannel}
                        handleRename={renameChannel}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ChannelsBox;