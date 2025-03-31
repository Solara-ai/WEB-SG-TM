import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getFeedBack,
  getFeedBackDetail,
  sendFeedBack,
} from "../../api/FeedBackApi";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Mail, Send } from "lucide-react";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await getFeedBack();
      if (response?.data) {
        setFeedbackList(Array.isArray(response.data) ? response.data : []);
      } else {
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
    }
  };

  const handleSelectFeedback = async (id) => {
    try {
      const response = await getFeedBackDetail(id);
      if (response?.data) {
        setSelectedFeedback(response.data);
      }
    } catch (error) {
      console.error("Error fetching feedback details:", error);
    }
  };

  const handleSendReply = async () => {
    if (selectedFeedback && replyMessage.trim()) {
      try {
        await sendFeedBack(selectedFeedback.userId, replyMessage);
        setReplyMessage("");
        fetchFeedback();
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />
        <div className="grid grid-cols-3 gap-4 p-4">
          <motion.div
            className="col-span-1 border-r p-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">User Feedback</h2>
            <ul>
              {feedbackList.length > 0 ? (
                feedbackList.map((feedback) => (
                  <motion.li
                    key={feedback.id}
                    className="p-3 border-b cursor-pointer hover:bg-gray-200 transition-all rounded-lg flex items-center gap-2"
                    onClick={() => handleSelectFeedback(feedback.id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Mail className="text-blue-500" /> {feedback.title}
                  </motion.li>
                ))
              ) : (
                <p className="text-gray-500 text-center">No feedback available</p>
              )}
            </ul>
          </motion.div>

          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedFeedback ? (
              <Card className="p-6 shadow-lg bg-white rounded-lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="text-xl font-bold">
                    {selectedFeedback.title}
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700">{selectedFeedback.message}</p>
                    <Input
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      className="mb-4 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <motion.div whileTap={{ scale: 0.95 }} className="inline-block">
                      <Button
                        onClick={handleSendReply}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
                        disabled={!replyMessage.trim()}
                      >
                        <Send className="mr-2" /> Send Reply
                      </Button>
                    </motion.div>
                  </CardContent>
                </motion.div>
              </Card>
            ) : (
              <motion.p
                className="text-gray-500 text-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Select a feedback to view details
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
