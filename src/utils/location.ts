const getLocationForSport = (sport: string): string  => {
    const locationMap: { [key: string]: string } = {
        "BASKETBALL": "สนามบาสภาคโยธา",
        "FOOTBALL": "ลานพระบรมรูปสองรัชกาล",
        "VOLLEYBALL": "ชั้น 12 ตึก 100 ปี",
        "CHAIRBALL": "ชั้น 12 ตึก 100 ปี"
    };

    const sportType = Object.keys(locationMap).find((sportType) =>
      sport.includes(sportType)
    );
    return sportType ? locationMap[sportType] : "สนามกีฬาคิดไปเอง";
};

export { getLocationForSport };