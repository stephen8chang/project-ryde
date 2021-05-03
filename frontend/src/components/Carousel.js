import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <Carousel autoPlay style={{ width: '50%' }}>
        <div>
            <img alt="" src="https://media-exp1.licdn.com/dms/image/C4E03AQG6_Xy1u4twLg/profile-displayphoto-shrink_800_800/0/1556049038463?e=1625702400&v=beta&t=mcUSq_dqZNuKV0jWn6Mbr9naOLfL5K053JSurn_c9Ss" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img alt="" src="https://media-exp1.licdn.com/dms/image/C4E03AQHUn7aNPwBBrw/profile-displayphoto-shrink_800_800/0/1555923412664?e=1625702400&v=beta&t=EUG7vTR5ekaR5HPqgMPJO4LDGYRXxEOtKWdPOf_AED0" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img alt="" src="https://media-exp1.licdn.com/dms/image/C4E03AQGvZK3cNeX8nA/profile-displayphoto-shrink_800_800/0/1581045263143?e=1625702400&v=beta&t=1bmPmNDcMkAk0rQikhueEwSJhGOnbwr9kZuzrc9WhEM" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img alt="" src="https://media-exp1.licdn.com/dms/image/C4E03AQFE0QEu3-GKVg/profile-displayphoto-shrink_800_800/0/1567572458509?e=1625702400&v=beta&t=ubgUNSmPWVZVBuZDt8Et9LamtzlhnjdPHX-xDaE6k2E" />
            <p className="legend">Legend 4</p>
        </div>
        <div>
            <img alt="" src="https://media-exp1.licdn.com/dms/image/C4E03AQHKIWTu9P5Nbg/profile-displayphoto-shrink_800_800/0/1581404924751?e=1625702400&v=beta&t=J2UNjD_cUXgRpg6yuopouUoXIFkw4eOTkAj5aT4HDMs" />
            <p className="legend">Legend 5</p>
        </div>
        
    </Carousel>
);
