import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { adminUpdateStatusOrder } from '../../apis/order';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ConfirmDialog from '../ui/ConfirmDialog';
import DropDownMenu from '../ui/DropDownMenu';

const AdminUpdateOrderStatusButton = ({ orderId = '', status = '', onRun }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [statusValue, setStatusValue] = useState(status);

    const { _id, accessToken } = getToken();

    useEffect(() => {
        setStatusValue(status);
    }, [status]);

    const handleUpdate = (value) => {
        setStatusValue(value);
        setIsConfirming(true);
    };

    const onSubmit = () => {
        setError('');
        setIsLoading(true);
        const value = { status: statusValue };
        adminUpdateStatusOrder(_id, accessToken, value, orderId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else if (onRun) onRun();
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="position-relative">
            {isLoading && <Loading />}
            {error && <Error msg={error} />}
            {isConfirming && (
                <ConfirmDialog
                    title="Update Order Status"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <DropDownMenu
                listItem={[
                    { label: 'Processing', value: 'Processing' },
                    { label: 'Shipped', value: 'Shipped' },
                    { label: 'Delivered', value: 'Delivered' },
                ]}
                size="small"
                value={statusValue}
                setValue={(value) => handleUpdate(value)}
                borderBtn={true}
            />
        </div>
    );
};

export default AdminUpdateOrderStatusButton;
