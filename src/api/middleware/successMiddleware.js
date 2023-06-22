const handleSuccessResponse = (req, res) => {
    if (res.data) {
        res.status(res.statusCode || 200).json({
            success: true,
            message: res.message || 'Request processed successfully',
            statusCode: res.statusCode || 200,
            data: res.data
        });
    } else {
        res.status(res.statusCode || 200).json({
            success: true,
            message: res.message || 'Request processed successfully',
            statusCode: res.statusCode || 200,
        });
    }
}

module.exports = handleSuccessResponse;