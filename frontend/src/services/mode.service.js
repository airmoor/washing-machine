import http from "../http-common";

class ModeDataService {
	getAll() {
		return http.get("/modes");
	}

	get(id) {
		return http.get(`/modes/${id}`);
	}

	create(data) {
		return http.post("/modes", data);
	}

	update(id, data) {
		return http.put(`/modes/${id}`, data);
	}

	delete(id) {
		return http.delete(`/modes/${id}`);
	}

	deleteAll() {
		return http.delete(`/modes`);
	}
}

export default new ModeDataService();