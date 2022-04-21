import { MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
const Occurrence = ({ message, time, distance }) => {
  return (
    <div
      style={{
        width: "100%",
        marginBottom: 15,
        border: "1px solid #DDDDDD",
        borderRadius: 8,
      }}
    >
      <p style={{ padding: 17, fontSize: 18, fontWeight: 400 }}>{message}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 17,
          paddingRight: 17,
          paddingBottom: 10,
        }}
      >
        <p style={{ color: "#808080", fontWeight: 600, fontSize: 14 }}>
          <MdLocationOn />à {distance} de você
        </p>
        <p style={{ color: "#000000", fontWeight: 400, fontSize: 16 }}>
          {time}
        </p>
      </div>
    </div>
  );
};

export const LastOccurrences = ({ occurrences = [] }) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ paddingLeft: 18, paddingBottom: 15, paddingTop: 18 }}>
        <h2>Últimas ocorrências</h2>
      </div>
      <div style={{ paddingLeft: 19, paddingRight: 19, paddingBottom: 19 }}>
        {occurrences.map((occurrence, index) => {
          console.log({ occurrence });
          return (
            <Occurrence
              key={occurrence}
              message={occurrence.message}
              time={occurrence.time}
              distance={occurrence.distance}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LastOccurrences;
