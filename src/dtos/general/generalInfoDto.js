export class GeneralDTO {
    constructor(_id, bannerInfo, bannerPic, aboutPic, aboutInfo, bannerCards ) {
        this.id = _id;
        this.bannerPic = bannerPic;
        this.bannerInfo = bannerInfo;
        this.aboutPic = aboutPic;
        this.aboutInfo = aboutInfo
        this.bannerCards = bannerCards
    }
}