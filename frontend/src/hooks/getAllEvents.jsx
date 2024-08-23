import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { server } from '../server';
import { toast } from 'react-toastify';
import { allEventsState } from '../recoil/atoms/allevents';

const useGetAllEvents = () => {
  const [allEvents, setAllEvents] = useRecoilState(allEventsState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allEvents.length > 0) return;

    setLoading(true);
    axios.get(`${server}/event/get-all-events`)
      .then((res) => {
        toast.success(res.data.message);
        setAllEvents(res.data.events);  
      })
      .catch((error) => {
        toast.error('Failed to fetch events');
        console.error('Error fetching events:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [allEvents, setAllEvents]);

  return { allEvents, loading };
};

export default useGetAllEvents;
