router.get('/:id/messages', async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ chatRoomId : id})
        .sort({ createdAt: 1})
        .populate('senderId', 'nickname');

        res.json(messages);
    } catch (err){
        console.error('메세지 불러오기 실패 : ', err);
        res.status(500).json({error: '서버오류'});
    }
});