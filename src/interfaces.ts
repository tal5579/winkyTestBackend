export interface IMovie {
    "im:name": {
        "label": string;
    },
    "im:image": [
        {
            "label": string;
            "attributes": {
                "height": string;
            }
        },
        {
            "label": string;
            "attributes": {
                "height": string;
            }
        },
        {
            "label": string;
            "attributes": {
                "height": string;
            }
        }
    ],
    "summary": {
        "label": string;
    },
    "im:price": {
        "label": string;
        "attributes": {
            "amount": string;
            "currency": string;
        }
    },
    "im:contentType": {
        "attributes": {
            "term": string;
            "label": string;
        }
    },
    "rights": {
        "label": string;
    },
    "title": {
        "label": string;
    },
    "link": [
        {
            "attributes": {
                "rel": string;
                "type": string;
                "href": string;
            }
        },
        {
            "im:duration": {
                "label": string;
            },
            "attributes": {
                "title": string;
                "rel": string;
                "type": string;
                "href": string;
                "im:assetType": string;
            }
        }
    ],
    "id": {
        "label": string;
        "attributes": {
            "im:id": string;
        }
    },
    "im:artist": {
        "label": string;
    },
    "category": {
        "attributes": {
            "im:id": string;
            "term": string;
            "scheme": string;
            "label": string;
        }
    },
    "im:releaseDate": {
        "label": string;
        "attributes": {
            "label": string;
        }
    }
}
