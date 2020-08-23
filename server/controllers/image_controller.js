const image_services = require('../services/image_services');

const uploadImage = async (file, description) => {
    const imageDetails = {
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
    };
    const res = await image_services.image_upload(imageDetails);
    imageDetails.key = res.key;
    imageDetails.description = description;
    imageDetails.url = res.url;
    imageDetails.size = file.size;
    res.id = await image_services.update_db(imageDetails);
    return res;
};

const getQueryCondition = (conditions) => {
    const dbConditions = {};
    for(const key in conditions) {
        dbConditions[key] = conditions[key];
    }
    // //for like query
    // if (conditions.filename) {
    //     dbConditions["filename"] = {
    //         $iLike: '%' + conditions.filename + '%'
    //     }
    // }

    if (!!conditions && conditions.fileTypes && conditions.fileTypes.length > 0) {
        dbConditions["fileType"] = {
            $in: conditions.fileTypes
        };
    }
    delete  dbConditions.fileTypes;
    return dbConditions;
};

const getDataByDetails  = async (body) => {
    const conditions = body.conditions;
    console.log(conditions);
    return await image_services.getAllData(getQueryCondition(conditions));
};

module.exports = {
    uploadImage: uploadImage,
    getDataByDetails: getDataByDetails,
}