import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { eventsState } from '../recoil/atoms/event';
import { server } from '../server';
import { toast } from 'react-toastify';
import { sellerState } from '../recoil/atoms/seller';

const useGetEvents = () => {
  const { _id } = useRecoilValue(sellerState); // Get shopId from sellerState
  const [events, setEvents] = useRecoilState(eventsState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!_id || events.length > 0) return; // Fetch events only if shopId is available and events state is empty

    setLoading(true);
    axios.get(`${server}/event/get-all-events/${_id}`)
      .then((res) => {
        toast.success(res.data.message);
        setEvents(res.data.events);
      })
      .catch((error) => {
        toast.error('Failed to fetch events');
        console.error('Error fetching events:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [_id, events, setEvents]);

  return { events, loading };
};

export default useGetEvents;
