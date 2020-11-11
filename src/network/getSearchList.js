import { request } from "@/network/request.js"

export default function getSearchList(searchText, page) {
  return request({
    url: "list",
    params: {
      p: page,
      n: 50,
      w: searchText,
    },
  })
}