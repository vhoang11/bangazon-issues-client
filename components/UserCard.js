/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

const UserCard = ({
  id,
  first_name,
  last_name,
  profile_image_url,
  created_on,
  email,
  uid,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const payload = {
    createdOn: '2023-06-14',
    endedOn: '2023-06-14',
    authorId: `${user.uid}`,
    followId: `${uid}`,
  };
  console.warn(payload);

  return (
    <Card className="text-center" style={{ width: '220px' }}>
      <Card.Img variant="top" src={profile_image_url} alt={first_name} style={{ height: '250px' }} />
      <Card.Header>{first_name} {last_name}</Card.Header>
      <Card.Body style={{ height: '100px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Created: {created_on}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>Email:{'\n'}
          {email}
        </Card.Text>
      </Card.Body>
      <div className="d-flex">
        {/* <Button
          onClick={() => {
            router.push(`/users/edit/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Edit User
        </Button> */}
        <Button
          onClick={() => {
            router.push(`/users/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          View
        </Button>

      </div>

    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  created_on: PropTypes.number.isRequired,
  email: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};

export default UserCard;
