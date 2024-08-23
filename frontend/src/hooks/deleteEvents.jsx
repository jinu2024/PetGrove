import { useRecoilState } from "recoil";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useState } from "react";
import { eventsState } from "../recoil/atoms/event";

const useDeleteEvent = () => {
    const [events, setEvents] = useRecoilState(eventsState);
    const [loading, setLoading] = useState(false);

    const deleteEvent = async (eventId) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${server}/event/delete-shop-event/${eventId}`, {
                withCredentials: true});
            if (response.data.success) {
                toast.success('Event deleted successfully');

                // Remove the deleted product from the state
                setEvents(events.filter(product => product._id !== eventId));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { deleteEvent, loading };
};

export default useDeleteEvent;
