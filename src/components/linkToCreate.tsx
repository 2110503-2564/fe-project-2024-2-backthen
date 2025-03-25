'use client'

import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserItem } from "../../interface";
import Link from "next/link";

function AdminBtn({role}:{role:string}){

    if (role !=="admin") {console.log(role); return null;
    }
    return (
        <Link href='/campground/create'>
            <button>Add new CampGround</button>
        </Link>
    );
};

export default AdminBtn;
